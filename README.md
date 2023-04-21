# imageSteganography Project

i recently learnt about steganography,i found it really interesting so i tried to implement it.

# LSB Steganography

LSB stands for Least Significant Bit."\n" The idea behind LSB embedding is that if we change the last bit value of a pixel, there won’t be much visible change in the color.<br>
For example, 0 is black. Changing the value to 1 won’t make much of a difference since it is still black, just a lighter shade. 

# What i did?

=> used ***html canvas*** to get the pixle information of images.

i've used last 2 bits of every channel of image pixel to store data.<br>
(each pixel => red channel(8bits), green channel(8bits), blue channel(8bits) and alpha channel(8bits)[for opacity]<br>
thus i was able to store each character in one pixel. (each character => 8bits)<br>

# for hiding data 
  At first make last 2 bits of all four channels of each pixel to zero.(we can do it by doing and operation with 252)<br>
  add any prefix to the message to be hidden which will mark the starting of message(I used "valid").<br>
  convert the modified data user want to hide to binary array <br>
  store the values of binary array in last 2 bits of pixel channels<br>

# for extracting data

  use the same steps to get pixel data from the image choosen.<br>
  Read only the last 2 bits and convert it back to the ASCII characters and you are done<br>
  ***to break remember you have set the all last bits to 0 and 0 is ASCII value of '\0' (null character) so break when you find null character***

 ## What if the user want to extract data from image in which no data is hidden
  so here comes the interesting part remember we used prefix while hiding data . That thing will help us now,<br>
  if the user will choose a image with no data your prefix will help you to detect it.<br>
