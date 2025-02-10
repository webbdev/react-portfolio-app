import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import emailjs from 'emailjs-com';

const Contact = () => {
	const location = useLocation();
	const isAboutPage = location.pathname === '/about';
	const title = isAboutPage ? 'Let’s Connect' : 'Contact Me';

	// State for form inputs and errors
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	});
	const [errors, setErrors] = useState({});

	// Validation for a single field
	const validateField = (id, value) => {
		let error = '';

		if (id === 'name' && !value.trim()) {
			error = 'Name is required';
		} else if (id === 'email') {
			if (!value.trim()) {
				error = 'Email is required';
			} else if (!/\S+@\S+\.\S+/.test(value)) {
				error = 'Email is invalid';
			}
		} else if (id === 'message' && !value.trim()) {
			error = 'Message is required';
		}

		setErrors((prevErrors) => ({
			...prevErrors,
			[id]: error,
		}));
	};

	// Handle input change
	const handleChange = (e) => {
		const { id, value } = e.target;

		// Update form data
		setFormData((prevData) => ({
			...prevData,
			[id]: value,
		}));

		// Validate field dynamically
		validateField(id, value);
	};

	// Validate the entire form
	const validate = () => {
		const newErrors = {};

		if (!formData.name.trim()) {
			newErrors.name = 'Name is required';
		}
		if (!formData.email.trim()) {
			newErrors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'Email is invalid';
		}
		if (!formData.message.trim()) {
			newErrors.message = 'Message is required';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// Handle form submission - Send email using EmailJS
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validate()) {
			try {
				// Use EmailJS to send the form data to your Gmail
				const templateParams = {
					name: formData.name,
					email: formData.email,
					message: formData.message,
				};

				// Send the email using EmailJS
				const response = await emailjs.send(
					import.meta.env.VITE_EMAILJS_SERVICE_ID,
					import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
					templateParams,
					import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            
				);

				// console.log('Email sent successfully:', response);
				alert('Message sent successfully!');

				// Reset form fields and errors
				setFormData({ name: '', email: '', message: '' });
				setErrors({});
			} catch (error) {
				console.error('Error sending email:', error);
				alert('Something went wrong. Please try again later.');
			}
		}
	};	
	
	return (
		<section id='contact' className='container'>
			<div className='border-t border-b border-black pt-12 md:pt-16 pb-10 md:pb-20 text-center'>
				<h2 className='text-[32px] md:text-[46px] lg:text-[50px] text-center mb-12 md:mb-16'>
					{title}
				</h2>

				<div className="w-full max-w-[900px] mx-auto">
					<form className="text-s text-left" onSubmit={handleSubmit}>
						<div className="flex flex-wrap -mx-2 md:mb-6">
							<div className="w-full md:w-1/2 px-2 mb-6 md:mb-0">
								<label 
									className="block text-sm mb-2" 
									htmlFor="name"
								>
									Your Name *
								</label>
								<input 
									className="appearance-none border w-full bg-transparent hover:bg-grey_2 focus:bg-grey_2" 
									id="name" 
									type="text"
									value={formData.name}
									onChange={handleChange}
								/>
								{errors.name && (
									<p className="text-red text-xs mt-1">{errors.name}</p>
								)}
							</div>
							<div className="w-full md:w-1/2 px-2 mb-6 md:mb-0">
								<label 
									className="block text-sm mb-2" 
									htmlFor="email"
								>
									Your Email *
								</label>
								<input 
									className="appearance-none border w-full bg-transparent hover:bg-grey_2 focus:bg-grey_2" 
									id="email" 
									type="email"
									placeholder='john@example.com'
									value={formData.email}
									onChange={handleChange}
								/>
								{errors.email && (
									<p className="text-red text-xs mt-1">{errors.email}</p>
								)}
							</div>
						</div>

						<div className='flex flex-wrap -mx-2 mb-6'>
							<div className='w-full md:w-3/4 px-2 mb-6 md:mb-0'>
								<label
									className="block text-sm mb-2"
									htmlFor="message"
								>
									Leave a message *
								</label>
								<input
									className='border w-full bg-transparent hover:bg-grey_2 focus:bg-grey_2' 
									id='message'
									type='text'
									value={formData.message}
									onChange={handleChange}
								/>
								{errors.message && (
									<p className="text-red text-xs mt-1">{errors.message}</p>
								)}
							</div>
							<div className="w-full md:w-1/4 px-2">
								<button 
									className="appearance-none border border-black bg-red hover:bg-black text-white text-[15px] md:text-[16px] py-2 w-full h-[42px] mt-4 md:mt-[28px]" 
									type="submit"
								>
									Send
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</section>
	)
}

export default Contact