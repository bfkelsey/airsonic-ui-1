import { Component, OnInit } from '@angular/core';
import { MediaStream, StreamService } from '../../service/stream.service';
import { AlbumService } from '../../service/album.service';
import { VgAPI } from 'videogular2/core';

export const VOLUME = 'volume';

@Component({
  selector: 'app-media-controls',
  templateUrl: './media-controls.component.html',
  styleUrls: ['./media-controls.component.scss']
})

export class MediaControlsComponent implements OnInit {
  stream: MediaStream;

  constructor(private streamService: StreamService, private vgApi: VgAPI) { }

  ngOnInit() {
    this.streamService.onStreamStart(stream => {
      console.log(stream);
      this.stream = stream;
      this.vgApi.play();
    });
  }

  onPlayerReady() {
    this.vgApi.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.playAudio.bind(this));
  }

  playAudio() {
    this.vgApi.play();
  }

  albumImageUrl(albumImageSize) {
    if (this.stream) {
      return AlbumService.getAlbumImageUrl(this.stream.mediaFile.id, albumImageSize);
    }
    return '';
  }
}
