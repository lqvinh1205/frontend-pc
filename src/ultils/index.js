import * as XLSX from 'xlsx';

export const getImage = (nameImage) => {
  return `http://localhost:5000/images/${nameImage}`;
};

export const createFormData = (data) => {
  console.log(data);
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (key === 'images' || key === 'thumbnail' || key === 'files') {
      data[key]?.forEach((file) => {
        formData.append(key, file.originFileObj || null);
      });
    } else {
      if (data[key] && Array.isArray(data[key])) {
        data[key].forEach((value) => {
          formData.append(key, value || '');
        });
      } else {
        formData.append(key, data[key] || '');
      }
    }
  });
  return formData;
};

export const exportToExcel = (data) => {
  const workbook = XLSX.utils.book_new();

  const worksheet = XLSX.utils.aoa_to_sheet(data);

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

  const binaryData = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

  const blob = new Blob([s2ab(binaryData)], { type: 'application/octet-stream' });

  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'exported_data.xlsx';

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
};

const s2ab = (s) => {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i !== s.length; ++i) {
    view[i] = s.charCodeAt(i) & 0xff;
  }
  return buf;
};
