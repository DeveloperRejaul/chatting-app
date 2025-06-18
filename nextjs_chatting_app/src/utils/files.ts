export const downloadFiles =(files:File[]) => files.map((f)=> downloadFile(f.name, f.type, f.data))

export const downloadFile = (file: { name: string; type: string; data: string | ArrayBuffer | null }) => {
  if (!file.data) return;

  // If data is base64 string (e.g. starts with "data:...")
  if (typeof file.data === 'string' && file.data.startsWith('data:')) {
    const link = document.createElement('a');
    link.href = file.data;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else if (file.data instanceof ArrayBuffer) {
    // For ArrayBuffer data
    const blob = new Blob([file.data], { type: file.type });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  } else {
    console.warn("Unsupported file format");
  }
};
