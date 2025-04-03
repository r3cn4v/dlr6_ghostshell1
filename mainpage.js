$(document).ready(function() {

    $(document).ready(function () {
        $('.applicantTable').DataTable({
            pageLength: 10,
            responsive: true,
            order: [[2, 'desc']],
            language: {
                search: "Search records:",
                lengthMenu: "Show _MENU_ records per page",
                info: "Showing _START_ to _END_ of _TOTAL_ records",
                infoEmpty: "Showing 0 to 0 of 0 records",
                infoFiltered: "(filtered from _MAX_ total records)"
            }
        });
    });
    

    // View button click handler
    $('.view-btn').on('click', function() {
        var applicationNo = $(this).data('id');
        
        // Load applicant details via AJAX
        $.ajax({
            url: '../dole_user_dash_board/get_applicant_details.php',
            type: 'POST',
            data: { application_no: applicationNo },
            success: function(response) {
                $('#viewModalBody').html(response);
            },
            error: function() {
                $('#viewModalBody').html('Error loading applicant details.');
            }
        });
    });

    // Kill session on browser close
    $(window).on('beforeunload', function() {
        $.ajax({
            url: '../killsession/kill_session.js', // PHP file to handle session destruction
            type: 'POST',
            async: false // request sent before the page unloads
        });
    });
});
