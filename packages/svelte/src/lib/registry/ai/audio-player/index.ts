import Root from "./audio-player.svelte";
import ControlBar from "./audio-player-control-bar.svelte";
import DurationDisplay from "./audio-player-duration-display.svelte";
import Element from "./audio-player-element.svelte";
import MuteButton from "./audio-player-mute-button.svelte";
import PlayButton from "./audio-player-play-button.svelte";
import SeekBackwardButton from "./audio-player-seek-backward-button.svelte";
import SeekForwardButton from "./audio-player-seek-forward-button.svelte";
import TimeDisplay from "./audio-player-time-display.svelte";
import TimeRange from "./audio-player-time-range.svelte";
import VolumeRange from "./audio-player-volume-range.svelte";

export {
	Root,
	//
	Root as AudioPlayer,
	ControlBar,
	ControlBar as AudioPlayerControlBar,
	DurationDisplay,
	DurationDisplay as AudioPlayerDurationDisplay,
	Element,
	Element as AudioPlayerElement,
	MuteButton,
	MuteButton as AudioPlayerMuteButton,
	PlayButton,
	PlayButton as AudioPlayerPlayButton,
	SeekBackwardButton,
	SeekBackwardButton as AudioPlayerSeekBackwardButton,
	SeekForwardButton,
	SeekForwardButton as AudioPlayerSeekForwardButton,
	TimeDisplay,
	TimeDisplay as AudioPlayerTimeDisplay,
	TimeRange,
	TimeRange as AudioPlayerTimeRange,
	VolumeRange,
	VolumeRange as AudioPlayerVolumeRange,
};
