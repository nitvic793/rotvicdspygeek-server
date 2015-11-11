{% extends 'layout.html' %}

{% block title %}My Page{% endblock %}
{% block head %}
<link rel="stylesheet" href="../css/foundation.css">
{% endblock %}
{% block content %}
<div class="row">
<div class="large-12 columns">
<h3>Add School</h3>
<hr/>
<!--Will need to use AJAX after security is implemented-->
  <form action="../school/create" method="post">
  <input type="text" placeholder="School Name" name="schoolName"/>
  <input type="text" placeholder="City" name="city"/>
  <input type="text" placeholder="Country" name="country"/>
  <input type="submit" class="button" value="Add Record">
  </form>
</div>
</div>
{% endblock %}
