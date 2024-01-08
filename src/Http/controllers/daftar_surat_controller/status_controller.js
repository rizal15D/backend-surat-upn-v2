const {
  Daftar_surat,
  Template_surat,
  Role_user,
  Users,
} = require("../../../models");


// function getStatus(role_user) {
//   console.log(role_user);
//   if (role_user == 2) {
//     return "didaftar tunggu tu";
//   }
//   if (role_user == 2 && !isRead) {
//     return "didaftar tunggu tu";
//   } else if (role_user == 2 && isRead) {
//     return "dibaca tu";
//   } else if (role_user == 2 && isRead && persetujuan) {
//     return "disetujui tu";
//   } else if (role_user == 2 && isRead && !persetujuan) {
//     return "ditolak tu";
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

function getStatus(role_user, isRead, persetujuan) {
  const statusMap = {
    3: ["didaftar tunggu tu"],
    2: !isRead ? ["didaftar tunggu tu"] : ["dibaca tu"],
    4: !isRead ? ["didaftar tunggu dekan"] : ["dibaca dekan"]
  };

  const updatedStatusMap = { ...statusMap }; // Create a copy of statusMap

  if (persetujuan) {
    if (persetujuan.includes('setuju')) {
      updatedStatusMap[2] = ["disetujui tu"];
      updatedStatusMap[4] = ["disetujui dekan"];
    } else if (persetujuan.includes('tolak')) {
      updatedStatusMap[2] = ["ditolak tu"];
      updatedStatusMap[4] = ["ditolak dekan"];
    }
  }

  return updatedStatusMap[role_user] || [];
}
// const status = [
//   "didaftar tunggu tu",
//   "dibaca tu",
//   "disetujui tu",
//   "tidak disetujui",
//   "didaftar tunggu dekan",
//   "dibaca dekan",
//   "disetujui dekan",
//   "ditolak dekan",
// ];

// function getStatus(user_id, surat_id) {
//   let index = 0;

//   const surat = Daftar_surat.findOne({
//     where: { id: surat_id },
//   });
//   surat.status = String(surat.status);
//   const user = Users.findOne({ where: { id: user_id } });

//   for (let i = 0; i < status.length(); i++) {
//     if (status[i] == surat.status) {
//       break;
//     }
//   }
//   //prodi
//   if (user.role_id == 3) {
//     return status[0];
//   }
//   //TU
//   else if (user.role_id == 2 && i < 1) {
//     return status[1];
//   } else if (user.role_id == 2 && i < 2) {
//   }
// }

module.exports = getStatus;
