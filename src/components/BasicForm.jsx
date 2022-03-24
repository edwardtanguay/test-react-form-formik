import { useState } from 'react';
import { Formik } from 'formik';

export const BasicForm = () => {
	const [formData, setFormData] = useState({});
	return (
		<div>
			<p>Please fill out the information: </p>
			<Formik
				initialValues={{ email: '', password: '' }}
				validate={values => {
					const errors = {};
					if (!values.email) {
						errors.email = 'Required';
					} else if (
						!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
					) {
						errors.email = 'Invalid email address';
					}
					if (!values.password) {
						errors.password = 'Required';
					}
					return errors;
				}}
				onSubmit={(values, { setSubmitting }) => {
					setFormData(values);
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting
				}) => (
					<form onSubmit={handleSubmit}>
						<div className="row">
							<input
								type="text"
								name="email"
								placeholder="email"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.email}
							/>
							<div className="info">
								{errors.email && touched.email && errors.email}
							</div>
						</div>
						<div className="row">
							<input
								type="password"
								name="password"
								placeholder="password"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.password}
							/>
							<div className="info">
								{errors.password && touched.password && errors.password}
							</div>
						</div>
						<button type="submit" disabled={Object.keys(errors).length}>
							Submit
						</button>
					</form>
				)}
			</Formik>
			{Object.keys(formData).length > 0 && (
				<div className="formData"><pre>{JSON.stringify(formData, null, 2)}</pre></div>
			)}
		</div>
	)
};