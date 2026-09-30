import fs from 'fs';
import path from 'path';

const API_BASE = 'https://pnnbao-ump-vieneu-tts-v3-turbo.hf.space';
const AUDIO_DIR = path.resolve('public/audio');

if (!fs.existsSync(AUDIO_DIR)) {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
}

// Full continuous studio monologue + individual sections
const tasks = [
  {
    id: 'apex_vieneu_master',
    text: 'Chào mừng quý khách đến với APEX Bespoke Atelier, nơi kỹ thuật cơ khí chính xác hòa quyện cùng nghệ thuật chế tác đỉnh cao. Từng đường nét được tôi luyện thủ công, từng xung nhịp động cơ đạt đến độ hoàn mỹ, chỉ dành riêng cho một chủ nhân độc bản.',
    voice: 'Thiện Minh'
  },
  {
    id: 'vieneu_line3',
    text: 'Từng đường nét được tôi luyện thủ công, từng xung nhịp động cơ đạt đến độ hoàn mỹ.',
    voice: 'Thiện Minh'
  },
  {
    id: 'vieneu_line4',
    text: 'Không tạo tác cho số đông, tác phẩm chỉ dành riêng cho một chủ nhân độc bản.',
    voice: 'Thiện Minh'
  },
  {
    id: 'vieneu_car_porsche',
    text: 'Porsche 911 GT3, gói khí động học Weissach thuần khiết trên đường đua.',
    voice: 'Thiện Minh'
  },
  {
    id: 'vieneu_car_ferrari',
    text: 'Ferrari F8 Tributo, bản giao hưởng động cơ V8 Twin-Turbo đỉnh cao nước Ý.',
    voice: 'Thiện Minh'
  },
  {
    id: 'vieneu_car_g63',
    text: 'Mercedes-AMG G63, biểu tượng uy quyền và sang trọng độc bản.',
    voice: 'Thiện Minh'
  }
];

async function generateWithRetry(task, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`\n🎙️ [Attempt ${attempt}] Synthesizing: [${task.id}]`);
      const payload = {
        data: [
          task.text,
          task.voice,
          null,
          0.75,
          25,
          0.95,
          1.2,
          400,
          256
        ]
      };

      const res = await fetch(`${API_BASE}/gradio_api/call/synthesize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const callData = await res.json();
      if (!callData.event_id) {
        throw new Error(`Call error: ${JSON.stringify(callData)}`);
      }

      const eventRes = await fetch(`${API_BASE}/gradio_api/call/synthesize/${callData.event_id}`);
      const eventText = await eventRes.text();

      const match = eventText.match(/"url":\s*"([^"]+)"/);
      if (!match) {
        throw new Error(`No url found in event: ${eventText.substring(0, 150)}`);
      }

      const audioUrl = match[1];
      console.log(`⬇️ Downloading ${task.id} from ${audioUrl}...`);
      const fileRes = await fetch(audioUrl);
      const buffer = Buffer.from(await fileRes.arrayBuffer());
      const targetPath = path.join(AUDIO_DIR, `${task.id}.wav`);
      fs.writeFileSync(targetPath, buffer);
      console.log(`✅ Successfully saved ${task.id}.wav (${buffer.length} bytes)`);
      return true;
    } catch (err) {
      console.warn(`⚠️ Attempt ${attempt} failed: ${err.message}`);
      if (attempt < maxRetries) {
        console.log(`⏳ Waiting 3s before retry...`);
        await new Promise((r) => setTimeout(r, 3000));
      }
    }
  }
  return false;
}

async function main() {
  for (const task of tasks) {
    await generateWithRetry(task);
    // Pause 2 seconds between tasks
    await new Promise((r) => setTimeout(r, 2000));
  }
  console.log('\n🎉 Finished processing audio generation!');
}

main();
