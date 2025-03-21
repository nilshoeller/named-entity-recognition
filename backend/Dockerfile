# Use an official Python runtime as a parent image
FROM python:3.10

# Set the working directory in the container
WORKDIR /app

# Install any needed packages specified in requirements.txt
COPY requirements.txt /app/

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . /app/

# Expose port 8000 for the Django development server
EXPOSE 8000

# Run Django's development server when the container starts
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

# Use an official Python runtime as a parent image
# FROM python:3.9-slim

# # Set the working directory in the container
# WORKDIR /app

# # Install pipenv
# RUN pip install pipenv

# # Copy the Pipfile and Pipfile.lock to the working directory
# COPY Pipfile Pipfile.lock /app/

# # Install dependencies using pipenv
# RUN pipenv install --deploy --ignore-pipfile

# # Copy the rest of your application
# COPY . /app/

# # Set the environment variable for the working directory in pipenv
# ENV PIPENV_VENV_IN_PROJECT=1

# # Expose the port the app runs on
# EXPOSE 8000

# # Command to run the application
# CMD ["pipenv", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]