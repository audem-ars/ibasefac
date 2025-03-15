const Course = require('../models/course');
const Enrollment = require('../models/enrollment');

// Create new course
exports.createCourse = async (req, res) => {
    try {
        const { title, description, level, category, modules } = req.body;

        const course = new Course({
            title,
            description,
            level,
            category,
            modules,
            instructor: req.user.id
        });

        await course.save();
        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get all courses
exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find()
            .populate('instructor', ['name', 'email']);
        res.json(courses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get course by ID
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate('instructor', ['name', 'email']);
        
        if (!course) {
            return res.status(404).json({ msg: 'Course not found' });
        }

        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update course
exports.updateCourse = async (req, res) => {
    try {
        let course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ msg: 'Course not found' });
        }

        // Make sure user is course instructor
        if (course.instructor.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        course = await Course.findByIdAndUpdate(
            req.params.id,
            { 
                $set: { 
                    ...req.body,
                    updatedAt: Date.now()
                } 
            },
            { new: true }
        ).populate('instructor', ['name', 'email']);

        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ 
            msg: 'Server Error', 
            error: err.message 
        });
    }
};

// Enroll in course
exports.enrollInCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ msg: 'Course not found' });
        }

        // Check if already enrolled
        if (course.enrolledStudents.includes(req.user.id)) {
            return res.status(400).json({ msg: 'Already enrolled in this course' });
        }

        // Add student to course
        course.enrolledStudents.push(req.user.id);
        course.updatedAt = Date.now();
        await course.save();

        // Create enrollment record with progress tracking
        const enrollment = new Enrollment({
            student: req.user.id,
            course: course._id,
            status: 'active',
            progress: {
                completed: [],
                lastAccessed: Date.now()
            }
        });

        await enrollment.save();

        // Return updated course with enrollment info
        const updatedCourse = await Course.findById(req.params.id)
            .populate('instructor', ['name', 'email'])
            .populate('enrolledStudents', ['name', 'email']);

        res.json(updatedCourse);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get course progress
exports.getCourseProgress = async (req, res) => {
    try {
        const enrollment = await Enrollment.findOne({
            student: req.user.id,
            course: req.params.id
        });

        if (!enrollment) {
            return res.status(404).json({ msg: 'Not enrolled in this course' });
        }

        // Get full course details with modules
        const course = await Course.findById(req.params.id);
        
        // Calculate total lessons
        const totalLessons = course.modules.reduce((total, module) => {
            return total + (module.lessons ? module.lessons.length : 0);
        }, 0);

        const completedLessons = enrollment.progress.completed.length;
        const progressPercentage = totalLessons > 0 
            ? Math.round((completedLessons / totalLessons) * 100)
            : 0;

        res.json({
            enrollment: {
                ...enrollment.toObject(),
                course: {
                    _id: course._id,
                    title: course.title,
                    modules: course.modules
                }
            },
            progressStats: {
                totalLessons,
                completedLessons,
                progressPercentage
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Mark lesson as completed
exports.completedLesson = async (req, res) => {
    try {
        const { moduleId, lessonId } = req.body;
        
        // Verify course and lesson exist
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ msg: 'Course not found' });
        }

        const module = course.modules.id(moduleId);
        if (!module) {
            return res.status(404).json({ msg: 'Module not found' });
        }

        const lesson = module.lessons.id(lessonId);
        if (!lesson) {
            return res.status(404).json({ msg: 'Lesson not found' });
        }

        let enrollment = await Enrollment.findOne({
            student: req.user.id,
            course: req.params.id
        });

        if (!enrollment) {
            return res.status(404).json({ msg: 'Not enrolled in this course' });
        }

        // Check if lesson already completed
        const isCompleted = enrollment.progress.completed.some(
            item => item.lessonId.toString() === lessonId
        );

        if (!isCompleted) {
            enrollment.progress.completed.push({
                moduleId,
                lessonId,
                completedAt: Date.now()
            });

            enrollment.progress.lastAccessed = Date.now();
            await enrollment.save();
        }

        // Calculate progress
        const totalLessons = course.modules.reduce((total, module) => {
            return total + (module.lessons ? module.lessons.length : 0);
        }, 0);

        const completedLessons = enrollment.progress.completed.length;
        const progressPercentage = totalLessons > 0 
            ? Math.round((completedLessons / totalLessons) * 100)
            : 0;

        res.json({
            enrollment: {
                ...enrollment.toObject(),
                course: {
                    _id: course._id,
                    title: course.title,
                    modules: course.modules
                }
            },
            progressStats: {
                totalLessons,
                completedLessons,
                progressPercentage
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Clean up progress
exports.cleanupProgress = async (req, res) => {
    try {
        const enrollment = await Enrollment.findOne({
            student: req.user.id,
            course: req.params.id
        });

        if (!enrollment) {
            return res.status(404).json({ msg: 'Not enrolled in this course' });
        }

        // Get current course structure
        const course = await Course.findById(req.params.id);
        
        // Filter out completed lessons that don't exist in current course structure
        enrollment.progress.completed = enrollment.progress.completed.filter(item => {
            return course.modules.some(module => 
                module._id.toString() === item.moduleId.toString() &&
                module.lessons.some(lesson => 
                    lesson._id.toString() === item.lessonId.toString()
                )
            );
        });

        await enrollment.save();

        // Return cleaned up progress
        const totalLessons = course.modules.reduce((total, module) => {
            return total + (module.lessons ? module.lessons.length : 0);
        }, 0);

        const completedLessons = enrollment.progress.completed.length;
        const progressPercentage = totalLessons > 0 
            ? Math.round((completedLessons / totalLessons) * 100)
            : 0;

        res.json({
            enrollment: {
                ...enrollment.toObject(),
                course: {
                    _id: course._id,
                    title: course.title,
                    modules: course.modules
                }
            },
            progressStats: {
                totalLessons,
                completedLessons,
                progressPercentage
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Start lesson attempt

exports.startLesson = async (req, res) => {
    try {
        const { moduleId, lessonId } = req.params;
        
        let enrollment = await Enrollment.findOne({
            student: req.user.id,
            course: req.params.id
        });

        if (!enrollment) {
            return res.status(404).json({ msg: 'Not enrolled in this course' });
        }

        // Find or create lesson progress
        let lessonProgress = enrollment.progress.completed.find(
            item => item.lessonId.toString() === lessonId
        );

        if (!lessonProgress) {
            lessonProgress = {
                moduleId,
                lessonId,
                attempts: []
            };
            enrollment.progress.completed.push(lessonProgress);
        }

        // Create new attempt
        lessonProgress.attempts.push({
            startedAt: Date.now(),
            status: 'started',
            required: {
                minTimeSpent: 10, // minimum 10 minutes
                contentViewed: true,
                quizScore: 70 // minimum 70% to pass
            },
            achieved: {
                timeSpent: 0,
                contentViewed: false,
                quizScore: 0
            }
        });

        enrollment.progress.lastAccessed = Date.now();
        await enrollment.save();

        res.json({
            message: 'Lesson attempt started',
            attempt: lessonProgress.attempts[lessonProgress.attempts.length - 1]
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update lesson progress
exports.updateLessonProgress = async (req, res) => {
    try {
        const { moduleId, lessonId } = req.params;
        const { timeSpent, contentViewed, quizScore } = req.body;

        let enrollment = await Enrollment.findOne({
            student: req.user.id,
            course: req.params.id
        });

        if (!enrollment) {
            return res.status(404).json({ msg: 'Not enrolled in this course' });
        }

        // Find current lesson progress
        let lessonProgress = enrollment.progress.completed.find(
            item => item.lessonId.toString() === lessonId
        );

        if (!lessonProgress || !lessonProgress.attempts.length) {
            return res.status(404).json({ msg: 'No active attempt found' });
        }

        // Update latest attempt
        const currentAttempt = lessonProgress.attempts[lessonProgress.attempts.length - 1];
        currentAttempt.achieved = {
            timeSpent: timeSpent || currentAttempt.achieved.timeSpent,
            contentViewed: contentViewed || currentAttempt.achieved.contentViewed,
            quizScore: quizScore || currentAttempt.achieved.quizScore
        };

        // Check if completion criteria met
        if (currentAttempt.achieved.timeSpent >= currentAttempt.required.minTimeSpent &&
            currentAttempt.achieved.contentViewed &&
            currentAttempt.achieved.quizScore >= currentAttempt.required.quizScore) {
            
            currentAttempt.status = 'completed';
            currentAttempt.completedAt = Date.now();
            lessonProgress.completedAt = Date.now();
        }

        enrollment.progress.lastAccessed = Date.now();
        await enrollment.save();

        res.json({
            message: 'Progress updated',
            lessonProgress
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};