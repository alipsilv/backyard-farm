import sql from '../utils/db';

// constructor
const CropType = function constructor(cropType) {
    this.description = cropType.description;
    this.sow_ini_indoor = cropType.sow_ini_indoor;
    this.sow_end_indoor = cropType.sow_end_indoor;
    this.sow_ini_outdoor = cropType.sow_ini_outdoor;
    this.sow_end_outdoor = cropType.sow_end_outdoor;
    this.gemination_period = cropType.gemination_period;
    this.harvest_time = cropType.harvest_time;
};

CropType.create = (newCropType, result) => {
    sql.query('INSERT INTO crop_type SET ?', newCropType, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        console.log('created crop type: ', { id: res.insertId, ...newCropType });
        result(null, { id: res.insertId, ...newCropType });
    });
};

CropType.findById = (cropTypeId, result) => {
    sql.query(`SELECT * FROM crop_type WHERE id = ${cropTypeId}`, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('found customer: ', res[0]);
            result(null, res[0]);
            return;
        }

        // not found CropType with the id
        result({ kind: 'not_found' }, null);
    });
};

CropType.getAll = (result) => {
    sql.query('SELECT * FROM crop_type', (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }

        console.log('crop_type: ', res);
        result(null, res);
    });
};

CropType.updateById = (id, cropType, result) => {
    const update = `
    UPDATE crop_type
    SET description = ?,
        sow_ini_indoor = ?,
        sow_end_indoor = ?
        sow_ini_outdoor = ?,
        sow_end_outdoor = ?
        gemination_period = ?,
        harvest_time = ?
   WHERE id = ?`;

    sql.query(update,
        [cropType.description,
            cropType.sow_ini_indoor,
            cropType.sow_end_indoor,
            cropType.sow_ini_outdoor,
            cropType.sow_end_outdoor,
            cropType.gemination_period,
            cropType.harvest_time, id],
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(null, err);
                return;
            }

            if (res.affectedRows === 0) {
                // not found CropType with the id
                result({ kind: 'not_found' }, null);
                return;
            }

            console.log('updated cropType: ', { id, ...cropType });
            result(null, { id, ...cropType });
        }
    );
};
//
// CropType.remove = (id, result) => {
//   sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//
//     if (res.affectedRows == 0) {
//       // not found CropType with the id
//       result({ kind: "not_found" }, null);
//       return;
//     }
//
//     console.log("deleted customer with id: ", id);
//     result(null, res);
//   });
// };
//
// CropType.removeAll = result => {
//   sql.query("DELETE FROM customers", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//
//     console.log(`deleted ${res.affectedRows} customers`);
//     result(null, res);
//   });
// };

module.exports = CropType;
