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
