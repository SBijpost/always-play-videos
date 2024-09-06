async function main() {
    if (
        !(
            Spicetify.Player &&
            Spicetify.Platform &&
            Spicetify.Playbar
        )
    ) {
        setTimeout(main, 10);
        return;
    }

    let alwaysShowVideo = false;

    const button = new Spicetify.Playbar.Button(
        "Always play video",
        "projector",
        () => {
            toggleAlwaysShowVideo();
            button.element.style.color = alwaysShowVideo ? "red" : "rgba(255,255,255,.7)";
        },
        false,
        false,
    );

    async function switchToVideoIfExists() {
        const itemHasAssociatedVideo = Spicetify.Player.data.item?.hasAssociatedVideo;
        if (itemHasAssociatedVideo && Spicetify.Player.data.item.mediaType !== "video") {
            await Spicetify.Platform.PlayerAPI.sendSignal("switch-to-video", 1);
        }
    }

    function toggleAlwaysShowVideo() {
        alwaysShowVideo = !alwaysShowVideo;
        if (alwaysShowVideo) {
            switchToVideoIfExists();
            Spicetify.Player.addEventListener("songchange", switchToVideoIfExists)
        } else {
            Spicetify.Player.removeEventListener("songchange", switchToVideoIfExists);
        }
    }


}

export default main;