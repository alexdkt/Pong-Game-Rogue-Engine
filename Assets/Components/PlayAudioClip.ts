/*
 * PlayAudio component taken from:
 * https://github.com/BeardScript/RogueSpaceShooter/blob/master/Assets/Components/PlayAudio.ts
 */

import * as RE from 'rogue-engine';
import { Audio } from 'three';

const { Prop } = RE;

export default class PlayAudioClip extends RE.Component {

  // Public component fields
  @Prop("Audio") clip: Audio;
  @Prop("Number") volume: number = 1;
  @Prop("Boolean") playOnAwake: boolean = true;
  @Prop("Boolean") loop: boolean = false;
  @Prop("Boolean") muted: boolean = false;

  start() {
    this.clip.setVolume(this.volume);
    this.clip.setLoop(this.loop);

    if (this.playOnAwake && !this.muted)
      this.clip && this.clip.play();
  }

  play() {
    if (!this.muted)
      this.clip && this.clip.play();
  }
}

RE.registerComponent(PlayAudioClip);
