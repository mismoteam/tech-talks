
/*
     File: SquareLayout.h
 Abstract: 
 
  Version: 1.0
 */

#import <UIKit/UIKit.h>

@interface SquareLayout : UICollectionViewLayout

@property (nonatomic, assign) CGPoint center;
@property (nonatomic, assign) CGFloat radius;
@property (nonatomic, assign) NSInteger cellCount;
@property (nonatomic, assign) CGFloat side;

@end
