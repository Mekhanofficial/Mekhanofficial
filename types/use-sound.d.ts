declare module 'use-sound' {
  import { Howl, HowlOptions } from 'howler';
  
  interface HookOptions {
    volume?: number;
    playbackRate?: number;
    interrupt?: boolean;
    soundEnabled?: boolean;
    sprite?: Record<string, [number, number]>;
    onplay?: () => void;
    onend?: () => void;
    onpause?: () => void;
    onstop?: () => void;
    onload?: () => void;
    onloaderror?: (id: number, error: any) => void;
  }

  type PlayFunction = (options?: PlayOptions) => void;
  
  interface PlayOptions {
    id?: string;
    forceSoundEnabled?: boolean;
    playbackRate?: number;
  }

  interface ExposedData {
    sound: Howl | null;
    stop: (id?: string) => void;
    pause: (id?: string) => void;
    duration: number | null;
  }

  type UseSoundTuple = [PlayFunction, ExposedData];

  function useSound(
    src: string | string[],
    options?: HookOptions
  ): UseSoundTuple;

  export default useSound;
}