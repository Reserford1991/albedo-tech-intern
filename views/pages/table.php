<div class="container">
    <h2>All members</h2><a onclick="stepOne()" class="registerForm" href="<?php echo "http://" . $_SERVER['SERVER_NAME'] ?>">Back to registration</a>
    <div class="table-responsive">
        <table class="table">
            <thead>
            <tr>
                <th>#</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Report subject</th>
                <th>email</th>
            </tr>
            </thead>
            <tbody>
                <?php foreach ($allMembersInfo as $key => $value): ?>
            <tr>
                    <td><?php echo $key+1 ?></td>
                <td><img src="<?php echo $value['photo'] ?>" alt="Person Image" width="100px" height="100px"></td>

                    <td><?php echo $value['name'] . ' ' . $value['surname']?></td>
                    <td><?php echo $value['report'] ?></td>
                    <td><a href="mailto:<?php echo $value['mail']?>" target="_top"><?php echo $value['mail']?></a></td>
            </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</div>