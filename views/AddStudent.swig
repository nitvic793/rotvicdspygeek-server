{% extends 'layout.html' %}

{% block title %}My Page{% endblock %}
{% block head %}
<link rel="stylesheet" href="../css/foundation.css">
{% endblock %}
{% block content %}
<div class="row">
<div class="large-12 columns">
<h3>Add Student</h3>
<hr/>
<form action="../student/create" method="post">
<input type="text" placeholder="First Name" name="firstName"/>
<input type="text" placeholder="Last Name" name="lastName"/>
<input type="email" placeholder="Email" name="email"/>
<input type="text" placeholder="Registration Number" name="registrationNo"/>
<select name="class">
{% for cls in clses %}
  <option value="{{ cls.id }}">{{ cls.standard }} {{ cls.section }}</option>
{% endfor %}
</select>
<select name="school">
{% for school in schools %}
  <option value="{{ school.id }}">{{ school.schoolName }}</option>
{% endfor %}
</select>
<input type="submit" class="button" value="Add Record">
</form>
</div>
</div>
{% endblock %}
