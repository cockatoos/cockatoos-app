import { TestBed } from "@angular/core/testing";
import { AudioRecorderService } from "./audio-recorder.service";

import { RecordedSpeechToTextService } from "./recorded-speech-to-text.service";
import { SpeechToTextService } from "./speech-to-text.service";

describe("RecordedSpeechToTextService", () => {
    let service: RecordedSpeechToTextService;
    let audioRecorderServiceSpy: jasmine.SpyObj<AudioRecorderService>;
    let speechToTextServiceSpy: jasmine.SpyObj<SpeechToTextService>;

    beforeEach(() => {
        const mockMethods = ["start", "stop", "reset"];

        const mockAudioRecorderService = jasmine.createSpyObj("AudioRecorderService", mockMethods);
        const mockSpeechToTextService = jasmine.createSpyObj("SpeechToTextService", mockMethods);

        TestBed.configureTestingModule({
            // Provide both the service-to-test and its (spy) dependencies.
            providers: [
                RecordedSpeechToTextService,
                {
                    provide: AudioRecorderService,
                    useValue: mockAudioRecorderService,
                },
                {
                    provide: SpeechToTextService,
                    useValue: mockSpeechToTextService,
                },
            ],
        });

        // Inject both the service-to-test and its (spy) dependencies.
        service = TestBed.inject(RecordedSpeechToTextService);
        audioRecorderServiceSpy = TestBed.inject(AudioRecorderService) as jasmine.SpyObj<AudioRecorderService>;
        speechToTextServiceSpy = TestBed.inject(SpeechToTextService) as jasmine.SpyObj<SpeechToTextService>;
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
