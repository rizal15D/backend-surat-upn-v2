// const cloudinary = require("../../../../config/cloudinaryConfig");
// const express = require("express");
// const app = express();
const {
  Daftar_surat,
  Template_surat,
  Role_user,
  Users,
} = require("../../../models");

// const role_user = await Role_user.findOne({ where: { id: req.query.id } });
// const role_user = await Role_user.findAll();

// function getStatus(role_user, isRead) {
//   switch (role_user) {
//     case 2:
//       return isRead ? "surat dibaca prodi" : "didaftar tunggu prodi";
//     case 3:
//       return isRead ? "surat dibaca tu" : "didaftar tunggu tu";
//     case 4:
//       return isRead ? "surat dibaca dekan" : "didaftar tunggu dekan";
//     default:
//       return "status tidak diketahui";
//   }
// }
// const user = await User.findOne({ where: { id: userId } });
// const role_user = user.role_id; // Assuming the User model has a role_id field
// const daftar_surat = await Daftar_surat.findOne({ where: { user_id: userId } });
// const isRead = daftar_surat.dibaca === 1; // Assuming the Daftar_surat model has a dibaca field

// const status = getStatus(role_user, isRead);

// function getStatus(role_user, isRead, persetujuan) {

//   if (role_user == 3 && suratStatus) {
//     return status[0];
//   }
//   if (role_user == 2 && isRead) {
//     return "dibaca tu";
//   } else if (role_user == 2) {
//     if (persetujuan) {
//       return "disetujui tu";
//     } else {
//       return "tidak disetujui";
//     }
//   }
//   if (role_user == 4 && !isRead) {
//     return "didaftar tunggu dekan";
//   } else if (role_user == 4 && isRead) {
//     return "dibaca dekan";
//   } else if (role_user == 4 && isRead && persetujuan) {
//     return "disetujui dekan";
//   } else if (role_user == 4 && isRead && !persetujuan) {
//     return "ditolak dekan";
//   }
// }

// function getStatus(role_user) {
//   console.log(role_user);
//   if (role_user == 2) {
//     return "didaftar tunggu tu";
//   }
//   if (role_user == 3) {
//     return "didaftar tunggu tu";
//   }
//   if (role_user == 4) {
//     return "didaftar tunggu dekan";
//   }
// }

const status = [
  "didaftar tunggu tu",
  "dibaca tu",
  "disetujui tu",
  "tidak disetujui",
  "didaftar tunggu dekan",
  "dibaca dekan",
  "disetujui dekan",
  "ditolak dekan",
];

function getStatus(user_id, surat_id) {
  let index = 0;

  const surat = Daftar_surat.findOne({
    where: { id: surat_id },
  });
  surat.status = String(surat.status);
  const user = Users.findOne({ where: { id: user_id } });

  for (let i = 0; i < status.length(); i++) {
    if (status[i] == surat.status) {
      break;
    }
  }
  //prodi
  if (user.role_id == 3) {
    return status[0];
  }
  //TU
  else if (user.role_id == 2 && i < 1) {
    return status[1];
  } else if (user.role_id == 2 && i < 2) {
  }
}

module.exports = getStatus;
