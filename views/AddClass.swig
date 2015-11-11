{% extends 'layout.html' %}

{% block title %}My Page{% endblock %}
{% block head %}
<link rel="stylesheet" href="../css/foundation.css">
{% endblock %}
{% block content %}
<div class="row">
<div class="large-12 columns">
<h3>Add Class</h3>
<hr/>
<form action="../class/create" method="post">
<input type="text" placeholder="Standard/Grade" name="standard"/>
<input type="text" placeholder="Section" name="section"/>
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
