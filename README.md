
# Making a Reverse Engineered Snap Lense

## What it intels: Link and Instructions 
Link: https://samaracanjura.github.io/ml5-lens/


This snap filter was created using Photoshop, p5.js and ml5 

I used Photoshop to draw the filter such as:  the different leaves and their colors and placement.
I changed the p5.js file to place the filter on the points of the forehead and it would track the points as you move along the camera. For the element I chose to track the distance between the point of the upper low and the point of the lower lip, if those two points created a distance larger than 10 then an image of freckles and stars will appear on your cheeks and across the nose. That image of freckles is to stay there and track the points of the nose, left cheek and right cheek and move along with you as you move your face around the camera. In order to remove the filter off the cheeks and nose you will have to click anywhere you want along the image surface. 


## Screenshots: 
### 1. Opening up the filter you will see a simple crown of leaves that tracks your head 
<img width="613" alt="Screen Shot 2021-07-06 at 2 41 57 PM" src="https://user-images.githubusercontent.com/82206324/124670347-b637b000-de68-11eb-8048-890e7b50c864.png">

Screenshot 1: shows the filter without implementing the element 

### 2. Opening your mouth by smiling will make the freckles appear 

<img width="635" alt="Screen Shot 2021-07-06 at 2 41 45 PM" src="https://user-images.githubusercontent.com/82206324/124671151-ecc1fa80-de69-11eb-856f-4da97d59a4a8.png">

Screenshot 2: the element has been implemented and you can now see the appearance of the freckles on the cheeks 

### 3. Click anywhere on the image to remove the freckles off your face and now you will only see the crown of leaves on your temple. 

## How To Run Filter: 
1. Clone repo into your personal device 
2. Open file in Visual Studio Code 
3. Install live server: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
4. Right click index.html > then click "open live server" 
