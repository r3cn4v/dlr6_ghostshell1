var sessionLocation = "<?php echo htmlspecialchars($_SESSION['location']); ?>";
    
        $(document).ready(function() {
            function performSearch() {
                var applicationNumber = $('#applicationNumber').val();
                var location = sessionLocation; // Use the session location
                if (applicationNumber) {
                    // Hide the message card if the input is valid
                    $('#messageCard').hide();
                    
                    $.ajax({
                        url: 'get_applicant_details_for_emp', // The PHP file that will handle the request
                        type: 'POST',
                        data: { application_no: applicationNumber, location: location }, // application and location sent as POST parameters to get_applicant_details.php
                        success: function(response) {
                            $('#viewModalBody').html(response); // Populate the modal body with the response
                            $('#viewModal').modal('show'); // Show the modal
                        },
                        error: function() {
                            $('#messageCard').show(); // Show the error card if AJAX fails
                            $('#messageText').text('Error fetching data. Please try again.');
                        }
                    });
                } else {
                    // Show the message card if the input is empty
                    $('#messageText').text('Please enter an application number.'); // Update the message
                    $('#messageCard').show(); // Show the message card
                }
            }

            // Click event for the search button
            $('#searchButton').click(function() {
                performSearch();
            });

            // Keypress event for the application number input
            $('#applicationNumber').keypress(function(event) {
                if (event.which === 13) { // Enter key
                    event.preventDefault(); // Prevent the default form submission
                    performSearch(); // Call the search function
                }
            });

            
        });
