//примерен модел , в случая за course

const { Schema, model, Types } = require("mongoose")

const urlPattern = /https?:\/\/./i;  // за валидация на image

const courseSchema = new Schema({
    title: { type: String, required: true, minlength: [4, 'Course name must be at least 4 characters long!'] },
    description: {
        type: String, required: true,
        minlength: [20, 'Description must be at least 20 characters long!'],
        maxlength: [50, 'Descrioption must be at most 50 characters long!F']
    },
    imageUrl: {
        type: String, required: true, validate: {
            validator: (value) => urlPattern.test(value),
            message: 'Invalid URL!'
        }
    },
    duration: { type: String, required: true },
    createdAt: { type: String, required: true },
    users: { type: [Types.ObjectId], ref: 'User', default: [] },
    owner: { type: [Types.ObjectId], ref: 'User' }
});

courseSchema.index({ title: 1 }, {    //ако ще има search на полето , върху което ще се търси се слага индекс
    collation: {
        locale: 'en',
        strength: 2
    }
});

const Course = model('Course', courseSchema);

module.exports = Course;