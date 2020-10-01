# ~~~~~ LandTech Test ReadMe ~~~~~

- [~~~~~ LandTech Test ReadMe ~~~~~](#predivdivpre)
- [Overview](#overview)
- [The Solution](#the-solution)

# Overview

The challenge was to create parcels of land, and return the perimeters of those parcels, from the supplied set of points. Contiguous points (horizontally or vertically, but not diagonally) define parcels. More infomation can be found [here](https://github.com/landtechnologies/technical-challenge/tree/master/backend).

# The Solution

The best and most efficient way to do this seems to be by taking the points and converting them to numbers. Then iterating through them, finding all four possible neighbours of each point. Then adding them to an existing parcel of land, if appropriate, or adding a new parcel.

From there, the perimeters can be calculated easily by multiplying the number of points in a parcel by 4, then subtracing those point boundaries that are inside the perimeter.

This saves time by not sorting, and finding multiple neighbours for each point at a time.

Essentially this solution is O(2n) due to the conversions, and then finding neighbours. There is a final lesser iteration of the parcels to get the perimeters.
