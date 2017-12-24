import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import {isPlatformServer} from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  result: string;
  private isServer: boolean;

  constructor(
    private tstate: TransferState,
    @Inject(PLATFORM_ID) platformId
  ) {
    this.isServer = isPlatformServer(platformId);
  }

  ngOnInit() {
    const RESULT_KEY = makeStateKey<string>('result');
    if (this.tstate.hasKey(RESULT_KEY)) {
      // We are in the browser
      this.result = this.tstate.get(RESULT_KEY, '');
    } else if (this.isServer) {
      // We are on the server
      this.tstate.set(RESULT_KEY, 'Im created on the server!');
    } else {
      // No result received (browser)
      this.result = 'Im created in the browser!';
    }

    this.tstate.onSerialize(RESULT_KEY, () => {
      // On the server
      return 'Im created on the server!';
    });
  }

}
