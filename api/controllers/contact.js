const Contact = require('../model/Contact');

const getContactController = (req, res, next) => {
    Contact.find()
        .then(contact => {
            res.status(200).json({
                message: 'Contact Found',
                contact
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Contact Not Found',
                error
            })
        })
}

const postContactController = (req, res, next) => {
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email
    })
    contact.save()
        .then(contact => {
            res.status(201).json({
                message: 'Contact Saved Successful',
                contact
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Saved Unsuccessful',
                error
            })
        })
}

const getSingleContactController = (req, res, next) => {
    let id = req.params.id;
    Contact.findById(id)
        .then(user => {
            res.status(200).json({
                message: 'Here you are',
                user
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Can not find contact for this id',
                error
            })
        })
}

const updatedContactController = (req, res, next) => {
    let id = req.params.id;
    const updatedContact = {
        name: req.body.name,
        email: req.body.email
    }
    Contact.findByIdAndUpdate(id, { $set: updatedContact })
        .then(contact => {
            Contact.findById(contact._id)
                .then(updateContact => {
                    res.json({
                        message: 'Updated Contact Successful',
                        updateContact
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'Can not get updated contact',
                        error
                    })
                })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Contact Not Updated',
                error
            })
        })
}

const deleteContactController = (req, res, next) => {
    let id = req.params.id;
    Contact.findByIdAndDelete(id)
        .then(result => {
            res.status(202).json({
                message: 'Successfully Deleted Contact',
                result
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Users Not Deleted',
                error
            })
        })
}

module.exports = {
    getContactController,
    postContactController,
    getSingleContactController,
    updatedContactController,
    deleteContactController,
}