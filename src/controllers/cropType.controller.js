import CropType from '../models/cropType.model';
// Create and Save a new CropType
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
    }

    // Create a CropType
    const cropType = new CropType({
        description: req.body.description,
        sow_ini_indoor: req.body.sow_ini_indoor,
        sow_end_indoor: req.body.sow_end_indoor,
        sow_ini_outdoor: req.body.sow_ini_outdoor,
        sow_end_outdoor: req.body.sow_end_outdoor,
        gemination_period: req.body.gemination_period,
        harvest_time: req.body.harvest_time,
    });

    // Save CropType in the database
    CropType.create(cropType, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                err.message || 'Some error occurred while creating the CropType.',
            });
        } else res.send(data);
    });
};

// Retrieve all CropTypes from the database.
exports.findAll = (req, res) => {
    CropType.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message:
               err.message || 'Some error occurred while getAll CropType.',
            });
        } else res.send(data);
    });
};

// Find a single CropType with a cropTypeId
exports.findOne = (req, res) => {
    CropType.findById(req.params.cropTypeId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found CropType with id ${req.params.cropTypeId}.`,
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving CropType with id ${req.params.cropTypeId}`,
                });
            }
        } else res.send(data);
    });
};

// Update a CropType identified by the customerId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
    }

    CropType.updateById(
        req.params.cropTypeId,
        new CropType(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === 'not_found') {
                    res.status(404).send({
                        message: `Not found CropType with id ${req.params.cropTypeId}.`,
                    });
                } else {
                    res.status(500).send({
                        message: `Error updating CropType with id ${req.params.cropTypeId}`,
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a CropType with the specified customerId in the request
exports.delete = (req, res) => {

};

// Delete all CropTypes from the database.
exports.deleteAll = (req, res) => {

};
