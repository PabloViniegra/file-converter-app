<script>
import mixinFormat from "../mixins/mixinFormats";
import mixinConverts from "../mixins/mixinConverts";
import { saveAs } from "file-saver";
import { getMimeType } from "../helpers/mimetypes";
import InputFile from "./InputFile.vue";

export default {
  name: "FormFile",
  components: {
    InputFile,
  },
  mixins: [mixinFormat, mixinConverts],
  data() {
    return {
      file: null,
      from: "md",
      to: "pdf",
      isLoading: false,
      error: null,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      invalidConversions: {
        md: ["docx"],
        html: ["docx"],
        pdf: ["md", "docx", "html", "pdf"],
      },
    };
  },
  computed: {
    acceptedFormats() {
      return `.${this.from}`;
    },
  },
  methods: {
    validateConversion() {
      const fromFormat = this.from?.toLowerCase();
      const toFormat = this.to?.toLowerCase();

      if (this.invalidConversions[fromFormat]?.includes(toFormat)) {
        this.error = `La conversión de ${fromFormat.toUpperCase()} a ${toFormat.toUpperCase()} no está permitida`;
        return false;
      }

      this.error = null;
      return true;
    },
    validateFile(file) {
      if (!file) {
        this.error = "Por favor, selecciona un archivo";
        return false;
      }

      const fileExtension = file.name.split(".").pop().toLowerCase();
      const allowedExtensions = ["md", "docx", "pdf", "html"];

      if (!allowedExtensions.includes(fileExtension)) {
        this.error =
          "Tipo de archivo no permitido. Formatos permitidos: MD, DOCX, PDF, HTML";
        return false;
      }

      if (fileExtension !== this.from.toLowerCase()) {
        this.error = `El formato de origen seleccionado (${this.from}) no coincide con la extensión del archivo (.${fileExtension})`;
        return false;
      }

      this.error = null;
      return true;
    },
    handleFile(file) {
      if (this.validateFile(file)) {
        this.file = file;
      }
    },
    async triggerConversion() {
      if (!this.file) {
        this.error = "Por favor, selecciona un archivo";
        return;
      }

      if (!this.validateFile(this.file)) {
        return;
      }

      if (!this.validateConversion()) {
        return;
      }

      try {
        this.isLoading = true;
        this.error = null;
        const convertedBlob = await this.convertFile({
          file: this.file,
          from: this.from,
          to: this.to,
        });
        const blob = new Blob([convertedBlob], { type: getMimeType(this.to) });
        saveAs(blob, `converted.${this.to}`);
      } catch (error) {
        this.error = `Error durante la conversión: ${error.message}`;
        console.error(`Error during download: ${error}`);
      } finally {
        this.isLoading = false;
      }
    },
  },
  watch: {
    from() {
      this.validateConversion();
      this.file = null;
    },
    to() {
      this.validateConversion();
    },
  },
};
</script>

<template>
  <section
    class="w-full my-5 p-5 bg-transparent rounded-lg flex flex-col items-center"
  >
    <div
      class="glass-container w-full max-w-4xl p-8 rounded-lg shadow-lg text-center"
    >
      <h5 v-if="!file" class="font-black text-black text-xl my-8 font-primary">
        Sube el archivo
      </h5>
      <h5
        v-else-if="file && !error"
        class="font-primary font-black text-black text-xl my-8"
      >
        Listo para transformar
      </h5>
      <h5
        v-else-if="file && error"
        class="font-primary font-black text-black text-xl my-8"
      >
        Ooops, algo no va bien
      </h5>
      <div
        class="container w-full flex flex-row items-center justify-between mb-10 min-h-[30rem]"
      >
        <div class="flex gap-x-4 items-center">
          <label for="from" class="font-secondary font-bold text-black text-md"
            >Origen</label
          >
          <v-select
            :options="formats.formats"
            v-model="from"
            class="absolute z-1000 min-w-[7rem]"
          ></v-select>
        </div>
        <div class="w-1/3">
          <InputFile
            v-model="file"
            :accept="acceptedFormats"
            :max-size="maxFileSize"
            @change="handleFile"
          />
        </div>
        <div class="flex gap-x-4 items-center">
          <label for="to" class="font-secondary font-bold text-black text-md"
            >Destino</label
          >
          <v-select
            :options="formats.formats"
            v-model="to"
            class="absolute z-1000 min-w-[7rem]"
          ></v-select>
        </div>
      </div>
      <footer class="flex flex-col items-center gap-y-4">
        <div
          v-if="error"
          class="w-full max-w-md mb-4 p-4 text-sm text-center text-red-800 rounded-lg bg-red-50 flex justify-center min-h-[40px]"
          role="alert"
        >
          {{ error }}
        </div>
        <button
          type="button"
          class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex items-center gap-x-2 disabled:opacity-50 disabled:cursor-not-allowed font-primary"
          @click="triggerConversion"
          :disabled="isLoading || !file || error"
        >
          <svg
            v-if="isLoading"
            class="size-5"
            xmlns="http://www.w3.org/2000/svg"
            width="128"
            height="128"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="M12 6.99998C9.1747 6.99987 6.99997 9.24998 7 12C7.00003 14.55 9.02119 17 12 17C14.7712 17 17 14.75 17 12"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                dur="560ms"
                from="0,12,12"
                repeatCount="indefinite"
                to="360,12,12"
                type="rotate"
              />
            </path>
          </svg>
          <img
            v-else
            class="size-3 rounded-md"
            src="../../public/fast-forward.png"
            alt="icon download"
          />
          {{ isLoading ? "Convirtiendo..." : "Convertir" }}
        </button>
      </footer>
    </div>
  </section>
</template>

<style scoped>
.glass-container {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
