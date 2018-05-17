<div class="container">
    <h2>All members</h2><a onclick="stepOne()" class="registerForm" href="{{ "http://" . $_SERVER['SERVER_NAME'] }}">Back
        to registration</a>
    <div class="table-responsive">
        <table class="table">
            <thead>
            <tr>
                @if($admin)
                    <th>Hide/Show</th>
                @endif
                <th>#</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Report subject</th>
                <th>Email</th>
                @if($admin)
                    <th>Status</th>
                @endif
            </tr>
            </thead>
            <tbody>
            @php
                $var = 1
            @endphp
            @foreach ($allMembersInfo as $key => $value)
                <tr id="row-{{ $key+1 }}" class="table-row">
                    @if($admin)
                        <td>
                            <div id="checkboxDiv-{{ $value->id }}" class="checkbox checkbox-primary">
                                <input id="{{ $value->id }}" type="checkbox"
                                       @if($value->hidden == 1)
                                       checked=""
                                       @endif
                                       onClick="hideMembers(this)"
                                >
                                <label id="{{ $value->id }}-label" for="checkbox">
                                    @if($value->hidden === 1)
                                        Show
                                    @else
                                        Hide
                                    @endif
                                </label>
                            </div>
                        </td>
                    @endif
                    <td>{{ $var++ }}</td>
                    <td><img src="{{ asset($value->photo) }}" alt="Person Image" width="100px" height="100px"></td>
{{--                        <td><img src="{{$value->photo}}" alt="Person Image" width="100px" height="100px"></td>--}}

                    <td>{{ $value->name . ' ' . $value->surname}}</td>
                    <td>{{ $value->report }}</td>
                    <td><a href="mailto:{{ $value->mail}}" target="_top">{{ $value->mail}}</a></td>
                    @if($admin)
                        <td>
                            <div class="tableGroup has-error" id="hidden-help-div-{{ $value->id }}">
                                <span id="hidden-help-{{ $value->id }}" class="help-block table-help">Hidden</span>
                            </div>
                            <div class="tableGroup has-success" id="shown-help-div-{{ $value->id }}">
                                <span id="shown-help-{{ $value->id }}" class="help-block table-help">Visible</span>
                            </div>
                        </td>
                    @endif
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
</div>