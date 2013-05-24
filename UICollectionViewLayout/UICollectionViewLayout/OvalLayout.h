
/*
     File: OvalLayout.h
 Abstract: 
 
  Version: 1.0
 */

#import <UIKit/UIKit.h>

@interface OvalLayout : UICollectionViewLayout

@property (nonatomic, assign) CGPoint center;
@property (nonatomic, assign) CGFloat hRadius;
@property (nonatomic, assign) CGFloat vRadius;
@property (nonatomic, assign) NSInteger cellCount;

@end
