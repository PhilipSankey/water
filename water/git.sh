git add .
echo "Please enter comment: "
read input_variable
git commit -a -m input_variable
git push heroku master