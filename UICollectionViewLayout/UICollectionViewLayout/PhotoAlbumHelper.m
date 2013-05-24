//
//  PhotoAlbumHelper.m
//  CircleLayout
//
//  Created by Esteban Torres on 5/23/13.
// /* Based of a code sample from Olivier Gutknecht. */
// /* StackOverflow link - http://stackoverflow.com/questions/12633843/get-all-of-the-pictures-from-an-iphone-photolibrary-in-an-array-using-assetslibr
//

#import "PhotoAlbumHelper.h"

static int count = 0;
static PhotoAlbumHelper* thePhotoAlbumHelper = nil;

@implementation PhotoAlbumHelper

- (void) getAllPicturesWithCompletionHandler:(void (^)(NSArray *imageArray))completionHandler
{
    imageArray=[[NSArray alloc] init];
    mutableArray =[[NSMutableArray alloc]init];
    NSMutableArray* assetURLDictionaries = [[NSMutableArray alloc] init];
    
    library = [[ALAssetsLibrary alloc] init];
    
    void (^assetEnumerator)( ALAsset *, NSUInteger, BOOL *) = ^(ALAsset *result, NSUInteger index, BOOL *stop) {
        if(result != nil) {
            if([[result valueForProperty:ALAssetPropertyType] isEqualToString:ALAssetTypePhoto]) {
                [assetURLDictionaries addObject:[result valueForProperty:ALAssetPropertyURLs]];
                
                NSURL *url= (NSURL*) [[result defaultRepresentation]url];
                
                [library assetForURL:url
                         resultBlock:^(ALAsset *asset) {
                             [mutableArray addObject:[UIImage imageWithCGImage:[[asset defaultRepresentation] fullScreenImage]]];
                             
                             if ([mutableArray count]==count)
                             {
                                 imageArray=[[NSArray alloc] initWithArray:mutableArray];
                                 if (completionHandler) {
                                     completionHandler(imageArray);
                                 }
                             }
                         }
                        failureBlock:^(NSError *error){
                            if (completionHandler) {
                                completionHandler(nil);
                            }
                        } ];
                
            }
        }
        else{
            if (completionHandler) {
                completionHandler(nil);
            }
        }
    };
    
    NSMutableArray *assetGroups = [[NSMutableArray alloc] init];
    
    void (^ assetGroupEnumerator) ( ALAssetsGroup *, BOOL *)= ^(ALAssetsGroup *group, BOOL *stop) {
        if(group != nil){
//           && [[group description] rangeOfString:@"LogN"].length > 0) {
            [group enumerateAssetsUsingBlock:assetEnumerator];
            [assetGroups addObject:group];
            count=[group numberOfAssets];
        }
    };
    
    assetGroups = [[NSMutableArray alloc] init];
    
    [library enumerateGroupsWithTypes:ALAssetsGroupAll
                           usingBlock:assetGroupEnumerator
                         failureBlock:^(NSError *error) {NSLog(@"There is an error");}];
}

#pragma mark - Public Static methods

+ (PhotoAlbumHelper*) sharedInstance
{
    if (thePhotoAlbumHelper == nil)
    {
        thePhotoAlbumHelper = [[PhotoAlbumHelper alloc] init];
    }
    
    return thePhotoAlbumHelper;
}

- (id) init
{
    if (!thePhotoAlbumHelper) {
        static dispatch_once_t onceToken;
        dispatch_once(&onceToken, ^{
            thePhotoAlbumHelper = self;
        });
    }
    
    self = thePhotoAlbumHelper;
    
    return self;
}

@end