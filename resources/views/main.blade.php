<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
<header>
    @include('layouts.style')
    @include('layouts.js')
</header>
@include('layouts.map')
@include('layouts.form')
</body>
</html>
