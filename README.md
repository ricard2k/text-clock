# text-clock
Simple multi-language text clock to run in raspberry pi.

The display spells out every minute of every day the way people say it: "A quarter to five" or "Nine minutes to six" or just "Midnight"

A real conversation starter!

## Help Wanted!
We’ve created some language templates for you to use.

English
Spanish
Russian
French
If you're interested in other language, needs to create a new csv with the strings for every minute in whole 24 hour. Please, contact me for further assistance.

## Adding a real time clock.
While your Pi is connected to a network it will be able to set its clock correctly using NTP. Without a network connection the system time and date will almost certainly be wrong.

This can be solved using a Real Time Clock (RTC) module. This will use a small coin cell battery to keep the time for the Pi even if it is turned off. When the Pi reboots it can set it’s own internal clock using the time held in by the RTC.

### DS1307 or DS3231?
Modules based on the DS1307 and DS3231 chips are popular devices and you’ll see them for sale from various retailers. My advice would be to go for a DS3231 based module that brings temperature compensation. They are more accurate and run happily from 3.3V.

In my case I've bought this sodial's module that amazon sells: http://www.amazon.es/gp/product/B00K67X496

This generic I2C module have pull-up resistors on the SDA and SCL pins but these aren’t required as the Pi has it’s own pull-ups. I didn’t want these on-board resistors to interfere with the operation of the I2C bus so I removed them. The location of the resistors is shown in the photo below :

### I2C & DS3231 setup
In order to ensure you’ve got the latest updates you should run the following commands :

sudo apt-get update sudo apt-get -y upgrade

From the command line type :

sudo raspi-config This will launch the raspi-config utility.

Enable SPI Using Raspi-config