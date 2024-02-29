import * as XLSX from 'xlsx';

export const getImage = (nameImage) => {
  return `http://localhost:5000/images/${nameImage}`;
};

export const createFormData = (data) => {
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
  a.download = 'Report.xlsx';

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

export const numberToVietnameseWords = (number) => {
  const units = ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ'];
  const digits = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function readThreeDigits(number) {
    let result = '';
    const hundred = Math.floor(number / 100);
    const ten = Math.floor((number % 100) / 10);
    const unit = number % 10;

    if (hundred > 0) {
      result += digits[hundred] + ' trăm ';
    }

    if (ten > 1) {
      result += digits[ten] + ' mươi ';
    } else if (ten === 1) {
      result += 'mười ';
    }

    if (ten !== 1 && unit > 0) {
      if (ten === 0 && hundred !== 0) {
        result += 'lẻ ';
      }
      result += digits[unit];
    }

    return result;
  }

  let result = '';
  let chunkIndex = 0;

  do {
    const chunk = number % 1000;
    if (chunk !== 0) {
      result = readThreeDigits(chunk) + ' ' + units[chunkIndex] + ' ' + result;
    }
    number = Math.floor(number / 1000);
    chunkIndex++;
  } while (number > 0);

  return capitalizeFirstLetter(result.trim());
};
