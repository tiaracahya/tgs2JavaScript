let pegawaiList = [];

function tambahData() {
  const nama = document.getElementById("nama").value;
  const umur = parseInt(document.getElementById("umur").value);
  const jabatan = document.getElementById("jabatan").value;
  const status = document.getElementById("status").value;

  // Validasi input
  if (!nama || !umur) {
    alert("Nama dan Umur harus diisi!");
    return;
  }

  // Hitung gaji pokok
  const gajiPokok = jabatan === "manajer" ? 15000000 :
                   jabatan === "asisten manajer" ? 10000000 : 5000000;

  const tunjanganJabatan = 0.15 * gajiPokok;
  const bpjs = 0.1 * gajiPokok;
  const tunjanganKeluarga = status === "menikah" ? 0.2 * gajiPokok : 0;
  const totalGaji = gajiPokok + tunjanganJabatan + bpjs + tunjanganKeluarga;

  // Simpan data ke array
  pegawaiList.push({ nama, umur, jabatan, status, gajiPokok, tunjanganJabatan, bpjs, tunjanganKeluarga, totalGaji });

  renderTable();

  // Clear input setelah tambah data
  document.getElementById("nama").value = "";
  document.getElementById("umur").value = "";
  document.getElementById("jabatan").value = "manajer";
  document.getElementById("status").value = "menikah";
}

function renderTable() {
  const tbody = document.getElementById("dataPegawai");
  tbody.innerHTML = "";

  let totalSemua = 0;

  pegawaiList.forEach((p, index) => {
    totalSemua += p.totalGaji;

    const row = document.createElement("tr");
    row.classList.add("fade-in");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${p.nama}</td>
      <td>${p.umur} tahun</td>
      <td>${p.jabatan}</td>
      <td>${p.status}</td>
      <td>Rp ${p.gajiPokok.toLocaleString()}</td>
      <td>Rp ${p.tunjanganJabatan.toLocaleString()}</td>
      <td>Rp ${p.bpjs.toLocaleString()}</td>
      <td>Rp ${p.tunjanganKeluarga.toLocaleString()}</td>
      <td>Rp ${p.totalGaji.toLocaleString()}</td>
      <td><button class="hapus-btn" onclick="hapusData(${index})">Hapus</button></td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById("totalGaji").innerText = `Rp ${totalSemua.toLocaleString()}`;
}

function hapusData(index) {
  pegawaiList.splice(index, 1);
  renderTable();
}

function resetTabel() {
  pegawaiList = [];
  renderTable();
}
