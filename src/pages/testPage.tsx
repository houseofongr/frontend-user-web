import PageLayout from "../components/layout/PageLayout";
import AudioWaveform from "../components/sound/AudioWaveform";


export default function TestPage() {
  return (
    <PageLayout>
      <h1>오디오 파형 데모</h1>
      <div className="w-[400px]">
        <AudioWaveform
          audioUrl="/public/sound/sound1.mp3"
          mode="dark"
        />
      </div>
    </PageLayout>
  );
}
