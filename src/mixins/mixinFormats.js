const getFormats = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URI}/formats`);
  const data = await res.json();
  return data;
};

export default {
  data() {
    return {
      formats: [],
    };
  },
  async created() {
    await this.fetchFormats();
  },
  methods: {
    async fetchFormats() {
      try {
        this.formats = await getFormats();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
