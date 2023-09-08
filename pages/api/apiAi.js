import { pipeline, env } from '@xenova/transformers';

class MyClassificationPipeline {
  static task = 'text-classification';
  static model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      // NOTE: Uncomment this to change the cache directory
      // env.cacheDir = './.cache';

      this.instance = pipeline(this.task, this.model, { progress_callback });
    }

    return this.instance;
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { clinicalText } = req.body;

    console.log(clinicalText);


    try {
      // Replace this code with the actual API call to ClinicalBERT.
      const classifier = await MyClassificationPipeline.getInstance();
      const response = await classifier(clinicalText);

      res.status(200).json({ response });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ai Clinical interpretation is currently unavailable, please check later' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}