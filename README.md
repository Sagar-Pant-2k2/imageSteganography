# imageSteganography Project

i recently learnt about,i found it really interesting so i tried to implement it

# LSB Steganography

LSB stands for Least Significant Bit. The idea behind LSB embedding is that if we change the last bit value of a pixel, there won’t be much visible change in the color.
For example, 0 is black. Changing the value to 1 won’t make much of a difference since it is still black, just a lighter shade. 

# What i did?

=> used html canvas to get the pixle information of images.
=>manipulated them to store data bits.
i've used last 2 bits of every channel of image pixel to store data.
(each pixel => red channel(8bits), green channel(8bits), blue channel(8bits) and alpha channel(8bits)[for opacity]
thus i was able to store each character in one pixel. (each character => 8bits)

