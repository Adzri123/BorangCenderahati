function validateForm() {
  let isValid = true;

  // Clear all previous errors
  document.querySelectorAll('.error-msg').forEach(span => span.textContent = '');
  document.querySelectorAll('input').forEach(input => input.classList.remove('error'));

  const fields = [
    { id: "namaPemohon", message: "Sila isi nama pemohon." },
    { id: "noPekerja", message: "Sila isi no. pekerja/pelajar." },
    { id: "bahagian", message: "Sila isi bahagian/pusat/unit/kolej." },
    { id: "telefon", message: "Sila isi no. telefon." },
    { id: "program", message: "Sila isi nama program atau majlis." },
    { id: "tarikh", message: "Sila pilih tarikh." },
    { id: "tempat", message: "Sila isi tempat." },
  ];

  // Check required fields
  fields.forEach(field => {
    const input = document.getElementById(field.id);
    const errorSpan = input.nextElementSibling;

    if (!input.value.trim()) {
      errorSpan.textContent = field.message;
      input.classList.add('error');
      isValid = false;
    }
});

// Validate plaque max value (1 only)
  const plaqueInput = document.getElementById("plaque");
  const plaqueError = plaqueInput.nextElementSibling;
  const plaqueVal = parseInt(plaqueInput.value);
  if (plaqueInput.value && plaqueVal > 1) {
    plaqueError.textContent = "Jumlah maksimum ialah 1.";
    plaqueInput.classList.add("error");
    isValid = false;
  }

  // Validate phone number: only digits, and length must be 10 or 11
const phoneInput = document.getElementById("telefon");
const phoneError = phoneInput.nextElementSibling;
const phoneValue = phoneInput.value.trim();

if (!/^\d+$/.test(phoneValue)) {
  phoneError.textContent = "Nombor telefon mestilah nombor sahaja (tiada simbol atau huruf).";
  phoneInput.classList.add("error");
  isValid = false;
} else if (phoneValue.length < 10 || phoneValue.length > 11) {
  phoneError.textContent = "Panjang nombor telefon mesti antara 10 hingga 11 digit.";
  phoneInput.classList.add("error");
  isValid = false;
}


  // Cenderahati / Alatulis: at least one must be filled
  const giftFields = ["plaque", "keychain", "pen", "notebook"];
  const hasAtLeastOneGift = giftFields.some(id => {
    const val = document.getElementById(id).value;
    return val && parseInt(val) > 0;
  });

  if (!hasAtLeastOneGift) {
    giftFields.forEach(id => {
      const input = document.getElementById(id);
      const errorSpan = input.nextElementSibling;
      errorSpan.textContent = "Sila isi sekurang-kurangnya satu kuantiti cenderahati atau alatulis.";
      input.classList.add('error');
    });
    isValid = false;
  }

  return isValid;
}