In addition, these features will be part of the future of this project:

A CMS/headless CMS dashboard to manage:
- clinic information
- services
- team members
- social media links
- operating hours
- contact information
- weekely schedule availability
- adhoc schedule availability for specific days
- holiday/off period schedules
- appointment management (can book on behalf of client, can cancel on behalf of client, can reschedule on behalf of client, can send reminders to client, can mark as no-show, can mark as completed, can mark as cancelled)
- pet records
- owner/client records
- client communication management (SMS/WhatsApp/Email)
   The communication should be fully automated but also customizable with templates. The idea is that there should be a template for:
    - when customer books for the first time (welcome and first login password, request to change on first login)
    - when an appointment is booked (Booked message)
    - when an appointment is confirmed (Confirmation message)
    - when an appointment is cancelled (Cancellation message)
    - when an appointment is rescheduled (Reschedule message)
    - when an appointment is reminded (Reminder message)
    - when an appointment is no-show (follow-up message, also flag user as prior no-show)
    - when an appointment is completed (call to action for review)



Once the user clicks the book appointment, he will be redirected to /book which will show him a list of cards for service selection, with a short description of each service. With each will also be associated the expected duration of the service and the price range for the service. There will also be home visit option as part of these services.
In case of home visit, the user will also be asked to provide the address, which will have a feature to decide between (In-city or outside city KM range).
In case of outside city KM range, the user will be shown the price for the KM range based on the vet's availability. automatic travel time should be added as part of the schedule rounded up to 10 min i.e if travel is 16 minutes, add 40 minutes for round trip.
Once selected, the user will be presented with a calendar view of the current week and available hours to schedule. The calendar will show the available slots for each day, with the current day highlighted. This should take into account the vets schedule availability for each day, and for home visits an additionnal time slot to travel from the clinic to the client's home address will be added to the appointment duration.

There will also be a questionaire required to fill for home visits as the doctor needs to be aware of equipment required.
The user can shift weeks to book into future weeks in advance (up to max 8).
Once a time slot is selected, the user will be asked to provide contact information (Name, Email and Phone Number, pet Name).
Once the user provides the information, he will be shown a confirmation screen with all the details of the appointment. 
Once confirmed, the appointment will be booked and a confirmation email/SMS/WhatsApp will be sent to the user, in case of home vistit the comfirmation must be manually approved by the doctor and it must be scheduled at least 24h in advance.


If the user's email or phone number is flagged as prior no show, there will be a warning screen shown to explain etiquete of online booking to the user and that if he misses a second appointment he will be blocked from booking online.
Cancellation must occur at least 24 hours prior to the visit's schedule. We might want to think of a different way to prevent competitors from filling the schedule with fake emails. I was thinking maybe a small deposit could be taken, but that can be a hassle for users, and also complicate the finances reporting. We could also for SMS or Email confirmation codes and block temporary email like 10 minute mail.

The clinic shall have a doctor and a technician so for things like blood sampling, and some types of services, the schedule should check availability of the relevant staff member(s)



Consider User account creation with verified email/phone number, this will help with the no-show tracking.


We should also make sure the website complies with any local laws for data processing and privacy. If necessary users should be shown disclaimers, and ask to agree to the terms and conditions before booking an appointment.





The website should also have analytic metrics for example Google Analytics, HotJar, etc. but they should be implemented in a way that is compliant with GDPR. For example, if using Google Analytics, it should be set up in a way that is compliant with GDPR.

We should also make sure these metrics include total website visits, total make an appointment clicks total and unique vistior based and understanding intersest to customer convertion rates.

