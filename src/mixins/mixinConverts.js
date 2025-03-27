import { getMimeType } from "../helpers/mimetypes";

const convert = async ({ file, from, to }) => {
  const formData = new FormData();
  formData.append("file", file);

  const url = `${
    import.meta.env.VITE_API_URI
  }/convert?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Error during conversion: ${res.statusText}`);
    }

    const arrayBuffer = await res.arrayBuffer();
    console.log("ArrayBuffer byteLength:", arrayBuffer.byteLength);
    const blob = new Blob([arrayBuffer], { type: getMimeType(to) });
    console.log("Blob size:", blob.size);
    return blob;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  data() {
    return {
      convertedBlob: null,
    };
  },
  methods: {
    async convertFile({ file, from, to }) {
      try {
        const result = await convert({ file, from, to });
        this.convertedBlob = result;
        return result;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },
};
