<script>
export default {
  name: "InputFile",
  props: {
    value: {
      type: File,
      default: null,
    },
    accept: {
      type: String,
      default: "",
    },
    maxSize: {
      type: Number,
      default: 10 * 1024 * 1024, // 10MB por defecto
    },
  },
  data() {
    return {
      isDragging: false,
      fileName: "",
      fileSize: "",
      error: null,
    };
  },
  methods: {
    formatFileSize(bytes) {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    },
    handleFile(file) {
      if (!file) return;

      if (file.size > this.maxSize) {
        this.error = `El archivo es demasiado grande. El tamaño máximo es ${this.formatFileSize(
          this.maxSize
        )}`;
        return;
      }

      this.fileName = file.name;
      this.fileSize = this.formatFileSize(file.size);
      this.error = null;
      this.$emit("input", file);
      this.$emit("change", file);
    },
    handleDrop(e) {
      e.preventDefault();
      this.isDragging = false;

      const file = e.dataTransfer.files[0];
      if (file) {
        this.handleFile(file);
      }
    },
    handleDragOver(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    handleDragLeave(e) {
      e.preventDefault();
      this.isDragging = false;
    },
  },
};
</script>
<template>
  <div class="w-full">
    <div
      class="relative border-2 border-dashed rounded-lg p-8 transition-all duration-200min-h-[150px]"
      :class="{
        'border-blue-500 bg-blue-50': isDragging,
        'border-gray-300 hover:border-blue-500': !isDragging && !value,
        'border-green-500 bg-green-50': value && !error,
      }"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
    >
      <input
        type="file"
        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        :accept="accept"
        @change="handleFile($event.target.files[0])"
      />

      <div class="flex flex-col items-center justify-center text-center">
        <div class="mb-4">
          <svg
            class="w-12 h-12 mx-auto"
            :class="{
              'text-blue-500': isDragging,
              'text-gray-400': !isDragging && !value,
              'text-green-500': value && !error,
            }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>

        <div class="space-y-2">
          <p
            class="text-sm font-medium font-secondary"
            :class="{
              'text-gray-600': !value,
              'text-green-600': value && !error,
            }"
          >
            {{ value ? fileName : "Arrastra y suelta tu archivo aquí" }}
          </p>

          <p v-if="value" class="text-xs text-gray-500">
            {{ fileSize }}
          </p>

          <p v-if="!value" class="text-xs text-gray-500 font-secondary">
            o haz clic para seleccionar
          </p>
        </div>
      </div>
    </div>

    <div
      v-if="error"
      class="mt-2 p-3 text-sm text-red-800 rounded-lg bg-red-50"
      role="alert"
    >
      {{ error }}
    </div>
  </div>
</template>
