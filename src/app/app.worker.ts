/// <reference lib="webworker" />

import { initMp3MediaEncoder } from 'mp3-mediarecorder/worker';

initMp3MediaEncoder({ vmsgWasmUrl: 'https://unpkg.com/vmsg@0.3.6/vmsg.wasm' });
