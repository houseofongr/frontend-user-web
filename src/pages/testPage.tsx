import PageLayout from "../components/layout/PageLayout";
import AudioWaveform from "../components/sound/AudioWaveform";
import API_CONFIG from "../config/api";

export default function TestPage() {
  return (
    <PageLayout>
      <h1>오디오 파형 데모</h1>
      <div className="w-[400px]">
        <AudioWaveform
          audioUrl={`${API_CONFIG.PUBLIC_FILE_API}/audios/808`}
          mode="dark"
        />
      </div>
    </PageLayout>
  );
}
