document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("regForm");
  const photoInput = document.getElementById("photo");
  const ijazahInput = document.getElementById("ijazah");
  const preview = document.getElementById("photoPreview");
  const modal = document.getElementById("modal");
  const summaryPre = document.getElementById("summaryPre");

  photoInput.addEventListener("change", () => {
    const file = photoInput.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran foto maksimal 2MB");
      photoInput.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      preview.innerHTML = `<img src=\"${e.target.result}\" alt=\"preview\">`;
    };
    reader.readAsDataURL(file);
  });

  ijazahInput.addEventListener("change", () => {
    const file = ijazahInput.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran ijazah maksimal 5MB");
      ijazahInput.value = "";
      return;
    }
    const allowed = [".pdf", ".jpg", ".jpeg", ".png"];
    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (!allowed.includes(ext)) {
      alert("Format ijazah harus PDF/JPG/PNG");
      ijazahInput.value = "";
    }
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    form.reset();
    preview.innerHTML = "<span class='small'>Preview</span>";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const required = ["fullName", "birthDate", "gender", "email", "phone", "address", "prevSchool", "program", "password", "confirmPassword"];
    for (const id of required) {
      const el = document.getElementById(id);
      if (!el.value.trim()) {
        alert(`Kolom ${id} wajib diisi`);
        el.focus();
        return;
      }
    }

    const pw = form.password.value;
    const cpw = form.confirmPassword.value;
    if (pw.length < 8) return alert("Password minimal 8 karakter");
    if (pw !== cpw) return alert("Konfirmasi password tidak cocok");

    if (!ijazahInput.files[0]) {
      return alert("Ijazah wajib diunggah");
    }

    if (!form.agree.checked) {
      return alert("Anda harus menyetujui pernyataan");
    }

    const data = getFormData();
    summaryPre.textContent = JSON.stringify(data, null, 2);
    modal.classList.add("show");
  });

  document.getElementById("closeModal").addEventListener("click", () => {
    modal.classList.remove("show");
  });

  document.getElementById("confirmSend").addEventListener("click", () => {
    modal.classList.remove("show");
    alert("Data berhasil disimpan!");
    form.reset();
    preview.innerHTML = "<span class='small'>Preview</span>";
  });

  function getFormData() {
    return {
      nama: form.fullName.value,
      tanggalLahir: form.birthDate.value,
      jenisKelamin: form.gender.value,
      email: form.email.value,
      telepon: form.phone.value,
      alamat: form.address.value,
      asalSekolah: form.prevSchool.value,
      programStudi: form.program.value,
      foto: form.photo.files[0]?.name || "-",
      ijazah: form.ijazah.files[0]?.name || "-",
    };
  }
});
