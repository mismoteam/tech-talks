//
//  PhotoAlbumHelper.h
//  CircleLayout
//
//  Created by Esteban Torres on 5/23/13.
// /* Based of a code sample from Olivier Gutknecht. */
// /* StackOverflow link - http://stackoverflow.com/questions/12633843/get-all-of-the-pictures-from-an-iphone-photolibrary-in-an-array-using-assetslibr
//

#import <Foundation/Foundation.h>
#include <AssetsLibrary/AssetsLibrary.h> 

@interface PhotoAlbumHelper : NSObject{
    ALAssetsLibrary *library;
    NSArray *imageArray;
    NSMutableArray *mutableArray;
}

+ (PhotoAlbumHelper*) sharedInstance;
- (void) getAllPicturesWithCompletionHandler:(void (^)(NSArray *imageArray))completionHandler;

@end
