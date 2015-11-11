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
<form action="../subject/create" method="post">
<input type="text" placeholder="Subject Name" name="subjectName"/>

<input type="submit" class="button" value="Add Record">
</form>
</div>
</div>
{% endblock %}
